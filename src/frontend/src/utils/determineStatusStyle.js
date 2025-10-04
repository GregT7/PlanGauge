import styleData from "@/utils/styleData.json" with { type: 'json' }

export default function determineStatusStyle(status, type) {
    if (styleData?.[status] && styleData?.[status]?.[type]) {
        return styleData[status]?.[type]
    } else {
        return styleData.unknown.base
    }
}