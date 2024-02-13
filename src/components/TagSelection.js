import React from 'react';

const TagSelection = ({ tags, selectedTags, onTagsChange }) => {
    const handleTagChange = (e) => {
        // Assuming `tags` is an array of tag objects with `id` and other properties
        const selectedTagIds = Array.from(e.target.selectedOptions).map(option => option.value);
        // Pass the selected tag IDs back to the parent component
        onTagsChange(selectedTagIds);
      };

  return (
    <select multiple value={selectedTags.map(tag => tag.id)} onChange={handleTagChange}>
      {tags.map(tag => (
        <option key={tag.id} value={tag.id}>
          {tag.name}
        </option>
      ))}
    </select>
  );
};

export default TagSelection;
