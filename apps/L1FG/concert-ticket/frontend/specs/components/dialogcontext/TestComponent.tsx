import { useConcertForm } from '@/components/admincontext/DialogContext';
export const TestComponent = () => {
  const { formData, addArtist, handleArtistChange, handleChange, removeArtist, handleDatesSelect, handleSubmit } = useConcertForm();
  return (
    <div>
      <div data-testid="formData">{JSON.stringify(formData)}</div>
      <button onClick={addArtist}>Add Artist</button>
      <input data-testid="input-concertname" id="concertname" onChange={handleChange} placeholder="Concert Name" />
      <button onClick={() => handleArtistChange(0, 'New Artist')}>Change Artist</button>
      <button onClick={() => removeArtist(0)}>Remove Artist</button>
      <button data-testid="button" onClick={() => handleDatesSelect([new Date('2024-01-01'), new Date('2024-01-02')])}>
        Select Dates
      </button>
      <button onClick={() => handleDatesSelect(undefined)}>Clear Dates</button>
      <form data-testid="Concertform" onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
