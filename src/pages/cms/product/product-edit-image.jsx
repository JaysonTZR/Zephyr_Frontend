import React, { useEffect, useState, useCallback, useRef, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";
import { uploadToS3, deleteFromS3 } from "../../../utils/s3Upload";

const CMSProductEditImage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const fileInput = useRef();
  const filesInput = useRef([]);
  const [photoReference, setPhotoReference] = useState([]);
  const [subPhotos, setSubPhotos] = useState([]);
  const [subPhotosReference, setSubPhotosReference] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [subPhotosBase64, setSubPhotosBase64] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    product_code: "",
    product_photo: "",
    product_sub_photo: "",
    product_price: 0.0,
    product_description: "",
    product_information: "",
    product_sale: false,
    product_new: false,
    product_status: "",
    created_by: "",
  });

  const onFileSelection = () => {
    fileInput.current.click();
  };

  const onFilesSelection = (index) => {
    filesInput.current[index].click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          product_photo: selectedFile.name,
          // product_photo_base64: reader.result.split(",")[1],
        }));
      };
    }
  };

  const handleFilesChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const fileBase64 = reader.result.split(",")[1];
        const updatedSubPhotos = [...subPhotos];
        updatedSubPhotos[index] = file.name;

        const updatedImageUrls = [...imageUrls];
        updatedImageUrls[index] = `data:image/jpeg;base64,${fileBase64}`;

        const updatedFiles = [...files];
        updatedFiles[index] = file;

        // const updatedSubPhotosBase64 = [...subPhotosBase64];
        // updatedSubPhotosBase64[index] = fileBase64;

        setSubPhotos(updatedSubPhotos);
        setImageUrls(updatedImageUrls);
        setFiles(updatedFiles);
        // setSubPhotosBase64(updatedSubPhotosBase64);

        setFormData((prevData) => ({
          ...prevData,
          product_sub_photo: updatedSubPhotos.join(', '),
          // product_sub_photo_base64: updatedSubPhotosBase64.join(', '),
        }));
      };
    }
  };

  const handleRemovePhoto = (index) => {
    const updatedSubPhotos = subPhotos.filter((_, i) => i !== index);
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    const updatedSubPhotosBase64 = subPhotosBase64.filter((_, i) => i !== index);

    setSubPhotos(updatedSubPhotos);
    setImageUrls(updatedImageUrls);
    setSubPhotosBase64(updatedSubPhotosBase64);

    setFormData((prevData) => ({
      ...prevData,
      product_sub_photo: updatedSubPhotos.join(', '),
      // product_sub_photo_base64: updatedSubPhotosBase64.join(', '),
    }));
  };

  const handleAddProductSubImage = () => {
    setSubPhotos([...subPhotos, '']);
    setImageUrls([...imageUrls, '']);
    setSubPhotosBase64([...subPhotosBase64, '']);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `product/${id}`
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
          category_id: responseData.category_id,
          product_name: responseData.product_name,
          product_code: responseData.product_code,
          product_photo: responseData.product_photo,
          product_sub_photo: responseData.product_sub_photo,
          product_price: responseData.product_price,
          product_description: responseData.product_description,
          product_information: responseData.product_information,
          product_sale: responseData.product_sale,
          product_new: responseData.product_new,
          product_status: responseData.product_status,
          created_by: responseData.created_by,
        });

        // setFile(responseData.product_photo);
        setImageUrl(`${responseData.product_photo}`);
        setPhotoReference(responseData.product_photo);

        const subPhotosArray = responseData.product_sub_photo !== "" ? responseData.product_sub_photo.split(',').map(photo => photo.trim()) : [''];
        setSubPhotos(subPhotosArray);
        setSubPhotosReference(subPhotosArray);
        setImageUrls(subPhotosArray.map(photo => `${photo}`));
        setSubPhotosBase64(subPhotosArray.map(() => ''));
      }
    } catch (error) {
      toast.error("Error Fetching Data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async () => {
    try {
      const deletedPhoto = photoReference === formData.product_photo ? '' : photoReference;
      const deletedSubPhotos = subPhotosReference.filter(photo => !subPhotos.includes(photo));

      if (deletedPhoto) {
        await deleteFromS3(deletedPhoto);
      }

      if (deletedSubPhotos.length > 0) {
        await Promise.all(deletedSubPhotos.map((file) => deleteFromS3(file)));
      }

      let uploadedFile = formData.product_photo;
      if (file) {
        uploadedFile = await uploadToS3(file);
      }

      let updatedSubPhotos = subPhotos;
      const validFiles = files.filter(file => file);
      if (validFiles.length > 0) {
        const uploadedFiles = await Promise.all(validFiles.map((file) => uploadToS3(file)));

        updatedSubPhotos = [...subPhotos];
        validFiles.forEach((file, index) => {
          const fileIndex = files.indexOf(file);
          updatedSubPhotos[fileIndex] = uploadedFiles[index];
        });
      }

      const response = await axios.put(
        apiUrl + `product/image/${id}`, 
        {
          'product_id': id,
          'category_id': formData.category_id,
          'product_name': formData.product_name,
          'product_code': formData.product_code,
          'product_photo': uploadedFile,
          // 'product_photo_base64': formData.product_photo_base64 ? formData.product_photo_base64 : "",
          'product_sub_photo': updatedSubPhotos.join(', '),
          // 'product_sub_photo_base64': formData.product_sub_photo_base64 ? formData.product_sub_photo_base64 : "",
          // 'product_deleted_photo': deletedPhoto,
          // 'product_deleted_sub_photos': deletedSubPhotosString,
          'product_price': formData.product_price,
          'product_description': formData.product_description,
          'product_information': formData.product_information,
          'product_sale': formData.product_sale,
          'product_new': formData.product_new,
          'product_status': formData.product_status,
          'created_by': formData.created_by,
        }, 
        {}
      );

      if (response.status === 200) {
        toast.success("Data Updated Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            startTransition(() => {
              navigate("/cms/product/list");
            });
          },
        });
      }
    } catch (error) {
      toast.error("Error Updating Data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleClear = () => {
    setFormData({
      category_id: "",
      product_name: "",
      product_code: "",
      product_photo: "",
      product_photo_base64: "",
      product_sub_photo: "",
      photo_sub_photo_base64: "",
      product_price: 0.0,
      product_description: "",
      product_information: "",
      product_sale: false,
      product_new: false,
      product_status: "active",
    });
    setFile(null);
    setImageUrl('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="product-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Edit Product Images</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center mb-2">
                    <label htmlFor="product_photo" className="mb-2 mt-2 w-72">
                      Product Photo
                    </label>
                    <input
                      type="text"
                      id="product_photo"
                      name="product_photo"
                      className={"border py-2 px-3 rounded-md w-full"}
                      placeholder={'Choose a file or drop it here...'}
                      value={formData && formData.product_photo}
                      disabled
                    />
                    <input
                      id="file"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      ref={fileInput}
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={onFileSelection} 
                      className="border flex items-center h-10 px-2 py-2 w-[100px] rounded-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-upload mr-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                        <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                      </svg>
                      <span>Browse</span>
                    </button>
                  </div>
                  {imageUrl && (
                    <div className="flex items-center mb-2">
                      <div className="w-[230px]"/>
                      <img
                        src={imageUrl}
                        alt="Product"
                        style={{ maxWidth: "300px", maxHeight: "300px" }}
                      />
                    </div>
                  )}

                  <div className="border rounded-lg">
                    <div className="p-4 border-b">
                      <h2 className="text-xl font-semibold">Edit Product Sub Images</h2>
                    </div>
                    <div className="p-6 space-y-6">
                      {subPhotos.map((photo, index) => (
                        <div key={index} className="border p-6 rounded-lg">
                          <div className="space-y-6">
                            <div className="flex items-center mb-2">
                              <label className="mb-2 mt-2 w-72">
                                Product Sub Photo {index + 1}
                              </label>
                              <input
                                type="text"
                                id={`product_sub_photo_${index}`}
                                name={`product_sub_photo_${index}`}
                                className="border py-2 px-3 rounded-md w-full"
                                placeholder="Choose a file or drop it here..."
                                value={photo}
                                disabled
                              />
                              <input
                                id={`file_${index}`}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                className="hidden"
                                ref={(el) => (filesInput.current[index] = el)}
                                onChange={(e) => handleFilesChange(e, index)}
                              />
                              <button
                                type="button"
                                onClick={() => onFilesSelection(index)}
                                className="border flex items-center h-10 px-2 py-2 w-[100px] rounded-md"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-upload mr-2" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                  <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                </svg>
                                <span>Browse</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(index)}
                                className="border flex items-center h-10 px-2 py-2 rounded-md ml-2 border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                Remove
                              </button>
                            </div>
                            {imageUrls[index] && (
                              <div className="flex items-center mb-2">
                                <div className="w-[210px]"/>
                                <img
                                  src={imageUrls[index]}
                                  alt={`Product ${index + 1}`}
                                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pl-6 pb-6">
                      <button
                        type="button"
                        className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                        onClick={handleAddProductSubImage}
                      >
                        Add Product Sub Image
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="bg-white text-gray-700 px-5 py-3 rounded-md hover:bg-gray-300 border border-black tracking-widest text-sm flex"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSProductEditImage;
