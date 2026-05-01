import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  comingSoon,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <div
        className={`flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0 ${
          comingSoon ? "opacity-60" : ""
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <p className="text-2xl">{title}</p>
            {comingSoon && (
              <span className="px-2 py-0.5 text-xs font-semibold tracking-wider rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase">
                Coming Soon
              </span>
            )}
          </div>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
            {comingSoon && tags.length === 0 && (
              <span className="italic text-neutral-600">Details coming soon...</span>
            )}
          </div>
        </div>
        {comingSoon ? (
          <span className="flex items-center gap-1 text-neutral-600 cursor-not-allowed select-none">
            Coming Soon
            <img src="assets/arrow-right.svg" className="w-5 opacity-30" />
          </span>
        ) : (
          <button
            onClick={() => setIsHidden(true)}
            className="flex items-center gap-1 cursor-pointer hover-animation"
          >
            Read More
            <img src="assets/arrow-right.svg" className="w-5" />
          </button>
        )}
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && !comingSoon && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
