import styleData from "@/utils/styleData.json" with { type: 'json' }

export default function determineStatusStyle(status) {
    if (styleData?.[status]) {
        return styleData[status].base
    } else {
        return styleData.error.base
    }
}