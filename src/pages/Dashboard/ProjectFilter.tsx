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
    currentFilter: string;
    changeFilter: (newFilter: string) => void;
}

const ProjectFilter = ({ currentFilter, changeFilter }: ProjectFilterProps) => {

    const handleFilterClick = (filter: string) => {
        console.log(filter);
        changeFilter(filter);
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