import React, { useState } from "react";
import Search from "../Search";
import Categories from "./Categories";
import Branding from "./Branding";
import FilterPrice from "./FilterPrice";
import Size from "./Size";
import Colors from "./Colors";
import Tags from "./Tags";

const AccordionItem = ({ onSearch, onCategorySelect, onBrandingSelect, onPriceSelect, onSizeSelect, onColorsSelect, onTagsSelect }) => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isBrandingOpen, setIsBrandingOpen] = useState(true);
    const [isFilterPriceOpen, setIsFilterPriceOpen] = useState(true);
    const [isSizeOpen, setIsSizeOpen] = useState(true);
    const [isColorsOpen, setIsColorsOpen] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(true);

    return (
        <div className="w-1/4 pr-12">
            <Search onSearch={onSearch} />
            <Categories setIsCategoriesOpen={setIsCategoriesOpen} isCategoriesOpen={isCategoriesOpen} onCategorySelect={onCategorySelect} />
            <Branding setIsBrandingOpen={setIsBrandingOpen} isBrandingOpen={isBrandingOpen} onBrandingSelect={onBrandingSelect}/>
            <FilterPrice setIsFilterPriceOpen={setIsFilterPriceOpen} isFilterPriceOpen={isFilterPriceOpen} onPriceSelect={onPriceSelect}/>
            <Size setIsSizeOpen={setIsSizeOpen} isSizeOpen={isSizeOpen} onSizeSelect={onSizeSelect}/>
            <Colors setIsColorsOpen={setIsColorsOpen} isColorsOpen={isColorsOpen} onColorsSelect={onColorsSelect}/>
            <Tags setIsTagsOpen={setIsTagsOpen} isTagsOpen={isTagsOpen} onTagsSelect={onTagsSelect}/>
        </div>
    );
};

export default AccordionItem;