import React, { useState } from "react";
import Search from "../Search";
import Categories from "./Categories";
import Branding from "./Branding";
import FilterPrice from "./FilterPrice";
import Size from "./Size";
import Colors from "./Colors";
import Tags from "./Tags";

const AccordionItem = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isBrandingOpen, setIsBrandingOpen] = useState(true);
    const [isFilterPriceOpen, setIsFilterPriceOpen] = useState(true);
    const [isSizeOpen, setIsSizeOpen] = useState(true);
    const [isColorsOpen, setIsColorsOpen] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(true);

    return (
        <div className="w-1/4 pr-12">
            <Search />
            <Categories setIsCategoriesOpen={setIsCategoriesOpen} isCategoriesOpen={isCategoriesOpen} />
            <Branding setIsBrandingOpen={setIsBrandingOpen} isBrandingOpen={isBrandingOpen} />
            <FilterPrice setIsFilterPriceOpen={setIsFilterPriceOpen} isFilterPriceOpen={isFilterPriceOpen} />
            <Size setIsSizeOpen={setIsSizeOpen} isSizeOpen={isSizeOpen} />
            <Colors setIsColorsOpen={setIsColorsOpen} isColorsOpen={isColorsOpen} />
            <Tags setIsTagsOpen={setIsTagsOpen} isTagsOpen={isTagsOpen} />
        </div>
    );
};

export default AccordionItem;