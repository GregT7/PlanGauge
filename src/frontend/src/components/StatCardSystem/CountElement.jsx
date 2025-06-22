function CountElement({styling, count}) {
    return (
    <div className="flex items-center gap-1">
        <div className={`w-12 h-12 rounded-full ${styling}`}></div>
        <span><span>{`x${count}`}</span></span>
    </div>
)
}

export default CountElement;