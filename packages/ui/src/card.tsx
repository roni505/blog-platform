import Image from "next/image";

type CardInput = {
    src: string,
    genre: string,
    title: string,
    author: string,
    date: string
}

const card = ({
    src, genre, title, author, date
}: CardInput) => {
    return (
          <div className="ui-relative ui-w-[400px] ui-h-[500px] ui-rounded-md ui-overflow-hidden ui-shadow-xl ui-bg-black ui-text-white">
      {/* Background Image using Next.js Image */}
      <div className="ui-absolute ui-inset-0">
        <Image
          src={src}
          alt="Framer Collaboration"
          fill // ✅ Makes it cover the whole div
          className="ui-opacity-45 ui-object-cover"
        />
      </div>

      {/* Content */}
      <div className="ui-relative ui-p-5 ui-z-10">
        <span className="ui-absolute ui-top-6 ui-left-6 ui-bg-black ui-text-white ui-text-sm ui-font-semibold ui-px-3 ui-py-1 ui-rounded-lg">
          {genre}
        </span>
        <h2 className="ui-pt-[360px] ui-text-xl ui-font-bold">{title}</h2>
        <div className="ui-pt-2">
        <p className="ui-text-base ui-text-gray-300">
          {author} &bull; {date}
        </p>
        </div>
      </div>
    </div>
    )
}

export default card