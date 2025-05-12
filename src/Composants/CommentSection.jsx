import { useState } from "react"
import toast from "react-hot-toast"

const CommentSection = () => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [author, setAuthor] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!newComment.trim() || !author.trim()){
            toast.error("Veuillez remplir tous les champs");
            return;
        }

        const comment = {
            id: Date.now(),
            text: newComment,
            author: author,
            date: new Date().toLocaleString()
        }

        setComments([...comments, comment])
        setNewComment("")
        setAuthor("")
        toast.success("Commentaire ajoute")
    }

    const handleDelete = (id) => {
        setComments(comments.filter(c => c.id !== id))
        toast.success("commentaire supprime")
    }



  return (
    <div className='mt-10 max-w-2xl p-2 bg-orange-50 mx-auto rounded flex flex-col'>
            <h1 className="text-center text-amber-800 font-bold text-2xl mb-6">Commentaires</h1>
            <form onSubmit={handleSubmit} className='flex flex-col p-2 rounded gap-4'>
                    <input type="text" className="border border-gray-300 p-2 rounded outline-none" placeholder='Nom' value={author} onChange={(e) => setAuthor(e.target.value)}/>

                    <textarea rows="10" placeholder='Votre commentaire' value={newComment} onChange={(e) => setNewComment(e.target.value)} className='border border-gray-300 rounded p-2 resize-none outline-0'></textarea>

                    <button className="text-center w-full font-semibold border border-amber-800 rounded p-2 hover:bg-amber-800 hover:text-white cursor-pointer transition-all duration-300">Envoyer</button>
            </form>


            <div className="mt-6 flex justify-between gap-4 flex-wrap">
              {comments.length === 0 ? (
                <p className='text-center text-xl text-amber-700 font-bold'>Pas encore de commentaires</p>
              ) : (
                comments.map((comment) => (
                    <div className="flex flex-col justify-between p-2 border-amber-700 rounded shadow-xs border w-full relative" key={comment.id}>
                            <p className='text-md text-start font-semibold text-amber-700'>{comment.text}</p>
                            <div className="flex flex-col p-2 items-end">
                                <p className='text-sm'>Envoyer par <span className='font-semibold'>{comment.author}</span></p>
                                <p className='text-sm'>{comment.date}</p>
                            </div>

                            <button className='text-center w-full rounded bg-red-700 text-white p-2 hover:bg-red-400 hover:font-bold transition-all duration-300 mt-6 cursor-pointer' onClick={() => handleDelete(comment.id)}>Supprimer</button>
                    </div>
                ))
              )}
            </div>
    </div>
  )
}

export default CommentSection