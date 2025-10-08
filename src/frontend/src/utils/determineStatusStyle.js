import styleData from "@/utils/styleData.json" with { type: 'json' }

export default function determineStatusStyle(status, type) {
    const norm_status = status?.toLowerCase()
    if (styleData?.[norm_status] && styleData?.[norm_status]?.[type]) {
        return styleData[norm_status]?.[type]
    } else {
        return styleData.unknown.base
    }
}