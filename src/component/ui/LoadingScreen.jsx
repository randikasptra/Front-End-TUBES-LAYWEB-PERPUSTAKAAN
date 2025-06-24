const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
        </div>
    )
}

export default LoadingScreen
