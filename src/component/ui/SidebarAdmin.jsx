import React from 'react'
import {
  Home,
  Book,
  Users,
  LogOut,
  Layers,
  CheckCircle,
  Tag,
  GraduationCap,
  ChevronRight,
  Library
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const SidebarAdmin = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location.href = '/'
  }

  const navItems = [
    { path: '/dashboard/admin', icon: <Home size={18} />, label: 'Dashboard' },
    { path: '/dashboard/admin/data-pengguna', icon: <GraduationCap size={18} />, label: 'Data Pengguna' },
    { path: '/dashboard/admin/data-kategori', icon: <Tag size={18} />, label: 'Data Kategori' },
    { path: '/dashboard/admin/data-buku', icon: <Book size={18} />, label: 'Data Buku' },
    { path: '/dashboard/admin/data-reservasi', icon: <CheckCircle size={18} />, label: 'Data Reservasi' },
    { path: '/dashboard/admin/data-peminjaman', icon: <Layers size={18} />, label: 'Data Peminjaman' }
  ]

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-blue-950/90 border-r border-slate-700/50 shadow-xl z-40'
    >
      {/* Header */}
      <div className='p-6 flex items-center gap-3 border-b border-slate-700/50'>
        <div className='p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg shadow'>
          <Library size={24} className='text-white' />
        </div>
        <h1 className='text-xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent'>
          Admin Sariwangi
        </h1>
      </div>

      {/* Navigation */}
      <nav className='p-4 space-y-1 mt-4'>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`group flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              currentPath === item.path
                ? 'bg-blue-800/50 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <div className='flex items-center gap-3'>
              <span className={`transition-colors ${
                currentPath === item.path ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-300'
              }`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            <ChevronRight 
              size={16} 
              className={`transition-transform ${
                currentPath === item.path ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
              }`} 
            />
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className='absolute bottom-0 w-full p-4 border-t border-slate-700/50'>
        <button
          onClick={handleLogout}
          className='group flex items-center justify-between w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors'
        >
          <div className='flex items-center gap-3'>
            <LogOut size={18} className='group-hover:rotate-12 transition-transform' />
            <span>Keluar</span>
          </div>
          <ChevronRight 
            size={16} 
            className='opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'
          />
        </button>
      </div>
    </motion.aside>
  )
}

export default SidebarAdmin