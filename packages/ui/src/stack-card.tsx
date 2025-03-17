import Image from 'next/image';

export type StackCardProps = {
    src: string;
    alt: string;
    title: string;
  };

const StackCard = ({src, alt, title}: StackCardProps) => {
    return (
        <div className="text-white flex flex-col items-center justify-center w-64 h-52 bg-[#0E0A00] rounded-3xl gap-4 text-2xl shadow-[0_-2px_0px_#3F3418]">
            <Image
            src={src}
            width={40}
            height={40}
            alt={alt}
            />
            <span className='w-28 text-center'>
                {title}
            </span>
        </div>
    )
}

export default StackCard;