import { useState } from "react"
import { ProjectCategories } from "types/categories.model"

const filterCategories = [
    "all",
    "mine",
    ProjectCategories.DEVELOPMENT,
    ProjectCategories.DESIGN,
    ProjectCategories.MARKETING,
    ProjectCategories.SALES,
]

interface ProjectFilterProps {

}

const ProjectFilter = ({ }: ProjectFilterProps) => {

    const [currentFilter, setCurrentFilter] = useState<string>(filterCategories[0]);

    const handleFilterClick = (filter: string) => {
        console.log(filter);
        setCurrentFilter(filter);
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter by:</p>
                {filterCategories.map(filter => (
                    <button
                        key={filter}
                        className={currentFilter === filter ? "active" : ""}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default ProjectFilter