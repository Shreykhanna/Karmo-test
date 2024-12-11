import { useState, useRef } from 'react'
import { calculateDistance } from '../helper/calculateDistance'
export const HomePage = () => {
  const [firstList, setFirstList] = useState<number[]>([])
  const [secondList, setSecondList] = useState<number[]>([])
  const [totalDistance, setTotalDistance] = useState<number>()
  const [fileName, setFileName] = useState<string | null>(null)
  const [inputFirstList, setInputFirstList] = useState<string>('')
  const [inputSecondList, setInputSecondList] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const fileContent = e.target?.result as string
      const lines = fileContent.split('\n')

      lines.forEach((line) => {
        const [firstValue, secondValue] = line
          .trim()
          .split(/\s+/)
          .map((item: string) => item.replace(/"/g, ''))
        if (firstValue && secondValue) {
          firstList.push(Number(firstValue))
          secondList.push(Number(secondValue))
        }
      })

      setFirstList(firstList)
      setSecondList(secondList)

      const result = calculateDistance(firstList, secondList)
      setTotalDistance(result)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setFirstList([])
      setSecondList([])
    }

    reader.readAsText(file)
  }

  const handleFileRemove = () => {
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setTotalDistance(undefined)
  }

  const handleFirstListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFirstList(event.target.value)
  }

  const handleSecondListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSecondList(event.target.value)
  }

  const handleSubmitLists = () => {
    const firstListArray = inputFirstList
      .replace(/['"]/g, '')
      .split(/\s+|\s*,\s*/)
      .map((item) => Number(item.trim()))
    const secondListArray = inputSecondList
      .replace(/['"]/g, '')
      .split(/\s+|\s*,\s*/)
      .map((item) => Number(item.trim()))
    setFirstList(firstListArray)
    setSecondList(secondListArray)

    const result = calculateDistance(firstListArray, secondListArray)
    setTotalDistance(result)
    setInputFirstList('')
    setInputSecondList('')
  }
  return (
    <>
      <div className='max-w-lg mx-auto p-4 mb-7 bg-orange-100 shadow-lg rounded-lg'>
        <h2 className='text-2xl text-center text-gray-600 mb-8'>This tool will help to find the chief chronicle. Just upload the coordinates file or manually input the lists, and it will calculate the distance between them.</h2>
      </div>

      <div className='mb-6'>
        <label htmlFor='file-upload' className='bg-blue-500 text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-blue-600'>
          Upload File
        </label>
        <input ref={fileInputRef} type='file' id='file-upload' className='hidden' accept='.txt' onChange={handleFileChange} />
      </div>
      <div><h1 className='text-black mb-4 text-2xl'>or</h1></div>
  
      {fileName && (
        <div className='flex items-center mb-6'>
          <span className='text-gray-700 font-semibold'>{fileName}</span>
          <button onClick={handleFileRemove} className='ml-4 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600'>
            Delete
          </button>
        </div>
      )}
      <div className='mb-6'>
        <div className='flex space-x-4'>
          <input type='text' value={inputFirstList} onChange={handleFirstListChange} className='border p-2 text-black rounded-md w-full' placeholder='Enter first list (e.g. 1 2 3)' />
          <input type='text' value={inputSecondList} onChange={handleSecondListChange} className='border p-2 text-black rounded-md w-full' placeholder='Enter second list (e.g. 4 5 6)' />
        </div>
        {inputFirstList && inputSecondList && (
          <button onClick={handleSubmitLists} className='mt-4 ml-20 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600'>
            Calculate Distance
          </button>
        )}
      </div>

      {totalDistance && (
        <div className='w-80 h-40 bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold text-center text-gray-700 mb-4'>Total Distance</h2>
          <h3 className='text-center text-gray-700'>{totalDistance}</h3>
        </div>
      )}
    </>
  )
}
