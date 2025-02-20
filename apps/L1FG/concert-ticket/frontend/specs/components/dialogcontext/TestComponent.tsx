import { useConcertForm } from '@/components/admincontext/DialogContext';
export const TestComponent = () => {
  const { formData, addArtist, handleArtistChange, handleChange, removeArtist, handleDatesSelect, handleSubmit } = useConcertForm();
  return (
    <div>
      <div data-testid="formData">{JSON.stringify(formData)}</div>
      <button onClick={addArtist}>Add Artist</button>

      <button onClick={() => handleArtistChange(0, 'New Artist')}>Change Artist</button>
      <button onClick={() => removeArtist(0)}>Remove Artist</button>
      <button data-testid="button" onClick={() => handleDatesSelect([new Date('2024-01-01T00:00:00.000Z')])}>
        Select Dates
      </button>
      <button onClick={() => handleDatesSelect(undefined)}>Clear Dates</button>
      <form data-testid="Concertform" onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
      <input data-testid="vip-quantity" type="number" name="vipTicket.quantity" value={formData.vipTicket.quantity} onChange={handleChange} />
      <input data-testid="vip-price" type="number" name="vipTicket.price" value={formData.vipTicket.price} onChange={handleChange} />
      <input data-testid="regular-quantity" type="number" name="regularTicket.quantity" value={formData.regularTicket.quantity} onChange={handleChange} />
      <input data-testid="regular-price" type="number" name="regularTicket.price" value={formData.regularTicket.price} onChange={handleChange} />
      <input data-testid="standing-quantity" type="number" name="standingAreaTicket.quantity" value={formData.standingAreaTicket.quantity} onChange={handleChange} />
      <input data-testid="standing-price" type="number" name="standingAreaTicket.price" value={formData.standingAreaTicket.price} onChange={handleChange} />
      <input data-testid="input-concertname" name="concertName" value={formData.concertName} onChange={handleChange} placeholder="Concert Name" />
      <div data-testid="vip-quantity-display">{formData.vipTicket.quantity}</div>
      <div data-testid="vip-price-display">{formData.vipTicket.price}</div>
      <div data-testid="regular-quantity-display">{formData.regularTicket.quantity}</div>
      <div data-testid="regular-price-display">{formData.regularTicket.price}</div>
      <div data-testid="standing-quantity-display">{formData.standingAreaTicket.quantity}</div>
      <div data-testid="standing-price-display">{formData.standingAreaTicket.price}</div>
    </div>
  );
};
