import { FC } from "react"
import { useStore } from "../../store"

const ModalOverlay: FC = () => {
  const { modal, setModal, language, literals } = useStore(
    ({ modal, setModal, language, literals }) => ({
      modal,
      setModal,
      language,
      literals,
    })
  )
  return modal ? (
    <div className="absolute inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-[#0a0a0a77]">
      <div className="min-w-[25vw] overflow-hidden rounded-lg bg-white">
        <div className="relative bg-gray-200 px-6 py-4">
          <p className="flex w-full items-center justify-center pr-10 text-center font-bold">
            {literals[modal.title][language]}
          </p>
          <button
            className="absolute right-0 top-0 mx-4 flex h-full items-center justify-self-end -mt-0.5 text-2xl"
            type="button"
            onClick={() => setModal(null)}
          >
            &times;
          </button>
        </div>
        <div className="flex items-center justify-center px-8 py-6">
          {literals[modal.message][language]}
        </div>
      </div>
    </div>
  ) : null
}

export default ModalOverlay
