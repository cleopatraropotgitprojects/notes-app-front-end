import { formatDistanceToNow } from 'date-fns'

export const formatTimeAgo = (dateString: string): string => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}
