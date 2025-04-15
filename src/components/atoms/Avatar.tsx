type AvatarProps = {
    src: string
    alt?: string
    size?: number
}

export const Avatar = ({ src, alt = 'avatar', size = 24 }: AvatarProps) => (
    <img
        src={src}
        alt={alt}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
    />
)
