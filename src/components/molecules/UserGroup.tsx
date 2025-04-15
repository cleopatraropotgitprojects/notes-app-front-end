import { Avatar } from '../atoms/Avatar'

type UserGroupProps = {
    users: { src: string; name: string }[]
}

export const UserGroup = ({ users }: UserGroupProps) => (
    <div className="flex -space-x-2">
        {users.map((user, idx) => (
            <Avatar key={idx} src={user.src} alt={user.name} size={28} />
        ))}
    </div>
)
