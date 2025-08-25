// Suppress console.error during tests to clean up output
beforeAll(() => {
	// Intentionally empty mock implementation to silence error logs in tests
	jest.spyOn(console, 'error').mockImplementation(() => {
		/* no-op */
	});
});

afterAll(() => {
	jest.restoreAllMocks();
}); 