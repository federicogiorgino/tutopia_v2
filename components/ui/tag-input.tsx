import { X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function TagInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (value: string[]) => void
}) {
  const [inputValue, setInputValue] = useState('')
  const addTag = () => {
    if (inputValue && !value.includes(inputValue)) {
      onChange([...value, inputValue])
      setInputValue('')
    }
  }
  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center rounded-md bg-primary px-2 py-1 text-sm text-primary-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
          placeholder="Enter a tag"
        />
        <Button type="button" onClick={addTag} className="ml-2">
          Add Tag
        </Button>
      </div>
    </div>
  )
}

export { TagInput }
