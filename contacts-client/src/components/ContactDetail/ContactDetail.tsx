import { ChangeEventHandler, FC, useState } from "react"
import { useStore } from "../../store"
import ContactEdits from "../ContactEdits"
import TextButton from "../common/TextButton/TextButton"
import EditableText from "../common/EditableText/EditableText"
import Form from "../common/Form/Form"
import Button from "../common/Button/Button"

const EmptyContactDetail: FC = () => {
  const { literals, language } = useStore(({ literals, language }) => ({
    literals,
    language,
  }))

  return (
    <div className="flex h-full items-center justify-center bg-gray-200">
      <p>{literals.SELECT_CONTACT?.[language]}</p>
    </div>
  )
}

const ContactDetail: FC = () => {
  const {
    selectContact,
    contactMode,
    setContactMode,
    literals,
    contact,
    language,
    fetchContacts,
    sessionData,
    setModal,
  } = useStore(
    ({
      selectContact,
      contactMode,
      setContactMode,
      selectedContact,
      literals,
      language,
      fetchContacts,
      sessionData,
      setModal,
    }) => ({
      selectContact,
      contactMode,
      setContactMode,
      contact: selectedContact,
      literals,
      language,
      fetchContacts,
      sessionData,
      setModal,
    })
  )

  const [showEdits, setShowEdits] = useState(false)

  const isEditing = contactMode === "EDIT"

  const handleEditClick = () => {
    setContactMode("EDIT")
  }

  const handleCancelClick = () => {
    setContactMode("VIEW")
  }

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (!contact) return
    const data = {
      updatedContactData: formData,
    }

    fetch("http://localhost:3001/api/contacts/" + contact._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData?.accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        setModal({
          message: "CONTACT_UPDATE_SUCCESS",
          title: "CONTACT_UPDATE_SUCCESS_TITLE",
        })
        fetchContacts().then(() => {
          selectContact(contact._id)
          setContactMode("VIEW")
        })
      } else {
        setModal({
          message: "CONTACT_UPDATE_ERROR",
          title: "CONTACT_UPDATE_ERROR_TITLE",
        })
      }
    })
  }

  const handleDeleteClick = () => {
    if (!contact) return

    if (
      confirm(
        "Are you sure you want to delete this contact? This action is irreversable."
      )
    ) {
      fetch("http://localhost:3001/api/contacts/" + contact._id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData?.accessToken}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setModal({
            message: "CONTACT_DELETION_SUCCESS",
            title: "CONTACT_DELETION_SUCCESS_TITLE",
          })
          fetchContacts().then(() => {
            selectContact("")
          })
        } else {
          setModal({
            message: "CONTACT_DELETION_ERROR",
            title: "CONTACT_DELETION_ERROR_TITLE",
          })
        }
      })
    }
  }

  return contact ? (
    <div className="flex h-full flex-col bg-gray-200 sm:flex-row">
      <div className="my-10 flex h-full flex-grow flex-col items-center justify-center sm:my-0">
        <div className="mb-8 h-[200px] w-[200px] overflow-hidden rounded-full bg-black">
          <img
            src="https://www.picsum.photos/400"
            className="object-cover"
            alt="contact avatar"
          />
        </div>
        <Form handleSubmit={handleSubmit} isEditing={isEditing}>
          {(
            handleChange: ChangeEventHandler,
            errors: Record<string, string>,
            hasUnsavedChanges: boolean
          ) => (
            <div className="mb-4 flex flex-col items-center">
              <div className="w-full">
                <div className="mb-4">
                  <EditableText
                    name="firstName"
                    heading
                    label={literals.FIRSTNAME[language]}
                    initialValue={contact?.firstName}
                    editable={isEditing}
                    required
                    handleChange={handleChange}
                    error={errors?.["firstName"] || null}
                  />
                  <EditableText
                    name="lastName"
                    heading
                    label={literals.LASTNAME[language]}
                    initialValue={contact?.lastName}
                    editable={isEditing}
                    required
                    handleChange={handleChange}
                    error={errors?.["lastName"] || null}
                  />
                </div>
                <EditableText
                  name="email"
                  type="email"
                  label={literals.EMAIL[language]}
                  initialValue={contact?.email}
                  editable={isEditing}
                  required
                  handleChange={handleChange}
                  error={errors?.["email"] || null}
                />
                <EditableText
                  name="phoneNumber"
                  label={literals.PHONENUMBER[language]}
                  initialValue={contact?.phoneNumber}
                  editable={isEditing}
                  required
                  handleChange={handleChange}
                  error={errors?.["phoneNumber"] || null}
                />
              </div>
              <div
                className="mt-10"
                style={{
                  opacity: showEdits ? 0 : 1,
                  pointerEvents: showEdits ? "none" : "auto",
                  transition: "opacity 200ms",
                }}
              >
                <TextButton
                  text={literals.VIEW_EDITS[language]}
                  uppercase
                  handleClick={() => setShowEdits(true)}
                />
              </div>
              <div className="absolute bottom-0 mb-8 grid grid-cols-2 gap-4">
                {isEditing ? (
                  <Button
                    text={
                      hasUnsavedChanges
                        ? literals.SAVE[language]
                        : literals.CANCEL[language]
                    }
                    variant={hasUnsavedChanges ? "PRIMARY" : "DEFAULT"}
                    uppercase
                    isSubmit={hasUnsavedChanges}
                    handleClick={
                      hasUnsavedChanges ? undefined : handleCancelClick
                    }
                  />
                ) : (
                  <Button
                    text={literals.EDIT[language]}
                    uppercase
                    variant="PRIMARY"
                    handleClick={handleEditClick}
                  />
                )}
                <TextButton
                  text={literals.DELETE[language]}
                  variant="DANGER"
                  uppercase
                  bold
                  handleClick={handleDeleteClick}
                />
              </div>
            </div>
          )}
        </Form>
      </div>
      <div className="h-full">
        {showEdits ? (
          <ContactEdits
            contact={contact}
            handleClose={() => setShowEdits(false)}
          />
        ) : null}
      </div>
    </div>
  ) : (
    <EmptyContactDetail />
  )
}

export default ContactDetail
