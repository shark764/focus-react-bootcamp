import React, {
  useState, useCallback, useEffect, useContext,
} from 'react';
import BaseList from '../Components/BaseList';
import { SearchContext } from '../Context/SearchContext';
import { getEntries } from '../sdk';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchString] = useContext(SearchContext);

  const retrieveCourses = useCallback(async () => {
    const entries = await getEntries({
      content_type: 'course',
      'fields.title[match]': searchString,
    });

    console.log(`%cCourses fetched using... "${searchString}":`, 'background: #ccc; color: #444;', entries);

    setCourses(entries);
  }, [searchString]);

  useEffect(() => {
    retrieveCourses();
  }, [retrieveCourses]);

  return <BaseList items={courses} />;
}

export default Courses;
