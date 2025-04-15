import { Tag } from '../atoms/Tag'

type TagListProps = {
    tags: string[]
}

export const TagList = ({ tags }: TagListProps) => (
    <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
            <Tag key={tag} label={tag} />
        ))}
    </div>
)
