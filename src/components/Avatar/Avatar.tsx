import './Avatar.css';

interface AvatarProps {
  imageSrc: string;
}

const Avatar = ({ imageSrc }: AvatarProps) => {

  return (
    <div className="avatar">
      <img src={imageSrc} alt="user avatar" />
    </div>
  );
}

export default Avatar;
