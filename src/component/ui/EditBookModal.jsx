import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Input } from '@/component/ui/input'
import { Button } from '@/component/ui/buttons'
import {
    BookUp2,
    X,
    Image,
    BookOpen,
    Barcode,
    User,
    Building2,
    CalendarDays,
    Library,
    AlignLeft,
    Bookmark,
    Tags,
    Save,
} from 'lucide-react'
import axios from 'axios'

const EditBookModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([])

    const [formData, setFormData] = useState({
        image: null,
        judul: '',
        deskripsi: '',
        isbn: '',
        penerbit: '',
        tahunTerbit: '',
        penulis: '',
        kategoriId: '',
        stok: '',
        status: 'tersedia',
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...formData,
                ...initialData,
                image: null, // reset image input on open
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = () => {
        onSubmit(formData)
        onClose()
    }

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(
                    'http://localhost:5000/api/category/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setCategory(response.data.data || [])
            } catch (error) {
                console.error('Error fetching Category:', error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategory()
    }, [])

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className='relative z-50'
        >
            <div
                className='fixed inset-0 bg-black/30'
                aria-hidden='true'
            />
            <div className='fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50 backdrop-blur-sm'>
                <Dialog.Panel className='w-full max-w-md rounded-xl bg-white dark:bg-slate-800 p-6 shadow-xl border border-slate-200 dark:border-slate-700'>
                    {/* Header */}
                    <div className='flex items-center justify-between mb-6'>
                        <Dialog.Title className='flex items-center text-xl font-semibold text-slate-800 dark:text-white gap-2'>
                            <BookUp2 className='w-5 h-5 text-yellow-600 dark:text-yellow-400' />
                            <span>Edit Buku</span>
                        </Dialog.Title>
                        <button
                            onClick={onClose}
                            className='p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
                        >
                            <X className='w-5 h-5' />
                        </button>
                    </div>

                    {/* Form */}
                    <div className='space-y-4 max-h-[75vh] overflow-y-auto pr-2'>
                        {/* Upload Cover */}
                        <div className='space-y-2'>
                            <label className='flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 gap-2'>
                                <Image className='w-4 h-4' />
                                Cover Buku
                            </label>
                            <input
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={handleChange}
                                className='block w-full text-sm text-slate-500 dark:text-slate-400
                                file:mr-4 file:py-2 file:px-4 
                                file:rounded-lg file:border-0 
                                file:text-sm file:font-semibold
                                file:bg-blue-50 dark:file:bg-slate-700 file:text-blue-600 dark:file:text-blue-400
                                hover:file:bg-blue-100 dark:hover:file:bg-slate-600'
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Input
                                name='judul'
                                placeholder='Judul Buku'
                                value={formData.judul}
                                onChange={handleChange}
                                icon={
                                    <BookOpen className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                }
                            />
                            <Input
                                name='isbn'
                                placeholder='ISBN'
                                value={formData.isbn}
                                onChange={handleChange}
                                icon={
                                    <Barcode className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                }
                            />
                            <Input
                                name='penulis'
                                placeholder='Penulis'
                                value={formData.penulis}
                                onChange={handleChange}
                                icon={
                                    <User className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                }
                            />
                            <Input
                                name='penerbit'
                                placeholder='Penerbit'
                                value={formData.penerbit}
                                onChange={handleChange}
                                icon={
                                    <Building2 className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                }
                            />
                            <Input
                                name='tahunTerbit'
                                placeholder='Tahun Terbit'
                                type='number'
                                value={formData.tahunTerbit}
                                onChange={handleChange}
                                icon={
                                    <CalendarDays className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                }
                            />
                            <Input
                                name='stok'
                                placeholder='Jumlah Stok'
                                type='number'
                                value={formData.stok}
                                onChange={handleChange}
                                icon={
                                    <Library className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                }
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 gap-2'>
                                <AlignLeft className='w-4 h-4' />
                                Deskripsi Buku
                            </label>
                            <textarea
                                name='deskripsi'
                                placeholder='Masukkan deskripsi buku...'
                                value={formData.deskripsi}
                                onChange={handleChange}
                                rows={3}
                                className='w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white'
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label className='flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 gap-2'>
                                    <Bookmark className='w-4 h-4' />
                                    Status Buku
                                </label>
                                <select
                                    name='status'
                                    value={formData.status}
                                    onChange={handleChange}
                                    className='w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white'
                                >
                                    <option value='tersedia'>Tersedia</option>
                                    <option value='dipinjam'>Dipinjam</option>
                                </select>
                            </div>

                            <div className='space-y-2'>
                                <label className='flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 gap-2'>
                                    <Tags className='w-4 h-4' />
                                    Kategori
                                </label>
                                <select
                                    name='kategoriId'
                                    value={formData.kategoriId}
                                    onChange={handleChange}
                                    className='w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white'
                                >
                                    <option value=''>Pilih Kategori</option>
                                    {category.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className='mt-8 flex justify-end gap-3'>
                        <Button
                            onClick={handleSubmit}
                            className='flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
                        >
                            <Save className='w-5 h-5' />
                            <span className='font-semibold'>Update Buku</span>
                        </Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default EditBookModal
