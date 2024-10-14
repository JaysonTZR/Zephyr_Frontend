import Search from './Search';

const Sidebar = () => {
    return (
        <div className="shop__sidebar">
            <Search />
            <div className="shop__sidebar__accordion">
                <div className="accordion" id="accordionExample">
                    {/* <AccordionItem id="collapseOne" title="Categories">
                    <Categories />
                    </AccordionItem> */}
                    {/* Add other AccordionItems like Branding, Filter Price, Size, Colors, Tags */}
                </div>
            </div>
        </div>
    );
  };
  
  export default Sidebar;