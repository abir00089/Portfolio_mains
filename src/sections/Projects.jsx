import React from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";

// ─── Memoised project row — only re-renders if its own props change ─────────
const MemoProject = React.memo(Project);

const Projects = () => {
  return (
    <section className="relative c-space pt-20 pb-20" id="work">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {myProjects.map((project) => (
        <MemoProject key={project.id} {...project} />
      ))}
    </section>
  );
};

export default Projects;
