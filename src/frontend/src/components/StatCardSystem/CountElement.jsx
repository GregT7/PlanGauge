const defaultStyling = "bg-stone-300";
const defaultCount = 0;
function CountElement({styling=defaultStyling, count=defaultCount}) {

    const validatedStyling = typeof styling !== "string" ? defaultStyling : styling;
    const validatedCount = !Number.isInteger(count) ? defaultCount : count;

    return (
        <div className="flex items-center gap-1">
            <div className={`w-12 h-12 rounded-full ${validatedStyling}`} data-testid="circle-div"></div>
            <span><span>{`x${validatedCount}`}</span></span>
        </div>
    );
}

export default CountElement;