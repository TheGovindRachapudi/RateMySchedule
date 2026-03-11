import { useDeferredValue, useState } from "react";

export default function CourseSearch({ courses, selectedCourseIds, onToggleCourse }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => {
    if (!normalizedQuery) {
      return true;
    }
    return (
      course.id.toLowerCase().includes(normalizedQuery) ||
      course.title.toLowerCase().includes(normalizedQuery) ||
      course.dept.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <div className="course-search panel-card">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Structured add-ons</p>
          <h3>Course picker</h3>
        </div>
        <span className="pill subtle">{selectedCourseIds.length} selected</span>
      </div>

      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search SDS 322, writing, probability..."
      />

      <div className="selected-course-list">
        {selectedCourseIds.map((courseId) => (
          <button
            key={courseId}
            type="button"
            className="chip selected"
            onClick={() => onToggleCourse(courseId)}
          >
            {courseId}
          </button>
        ))}
      </div>

      <div className="course-results">
        {filteredCourses.slice(0, 12).map((course) => {
          const selected = selectedCourseIds.includes(course.id);
          return (
            <button
              key={course.id}
              type="button"
              className={`course-row ${selected ? "selected" : ""}`}
              onClick={() => onToggleCourse(course.id)}
            >
              <span>{course.id}</span>
              <small>{course.title}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
