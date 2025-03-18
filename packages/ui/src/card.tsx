import Image from "next/image";

type CardInput = {
    src: string;
    genre: string;
    title: string;
    author: string;
    date: string;
};

const Card = ({ src, genre, title, author, date }: CardInput) => {
    return (
        <div className="relative w-[400px] h-[500px] rounded-md overflow-hidden shadow-xl bg-black text-white">
            {/* Background Image using Next.js Image */}
            <div className="absolute inset-0">
                <Image
                    src={src}
                    alt="Framer Collaboration"
                    fill // ✅ Makes it cover the whole div
                    className="opacity-45 object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative p-5 z-10">
                <span className="absolute top-6 left-6 bg-black text-white text-sm font-semibold px-3 py-1 rounded-lg">
                    {genre}
                </span>
                <h2 className="pt-[360px] text-xl font-bold">{title}</h2>
                <div className="pt-2">
                    <p className="text-base text-gray-300">
                        {author} &bull; {date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
