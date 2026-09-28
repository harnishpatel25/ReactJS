import { useState } from 'react'

const PRODUCTS_URL = '/api/products'

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  quantity: '',
}

export default function AddProduct({ onProductAdded }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(PRODUCTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      })

      if (!response.ok) {
        const problem = await response.json().catch(() => null)
        const message =
          problem?.message ||
          problem?.errors?.[0]?.defaultMessage ||
          `Failed to add product (${response.status})`
        throw new Error(message)
      }

      setForm(EMPTY_FORM)
      setSuccess('Product added.')
      onProductAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add product</h1>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        maxLength={100}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        maxLength={500}
        rows={4}
      />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        required
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        min="0"
        step="1"
        required
      />

      {error && <p role="alert">{error}</p>}
      {success && <p>{success}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Add product'}
      </button>
    </form>
  )
}
