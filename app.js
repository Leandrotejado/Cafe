/* React application for Café Aroma landing page */
function App() {
    const [events, setEvents] = React.useState(JSON.parse(localStorage.getItem('events')) || []);
    const [filter, setFilter] = React.useState('all');
    const [formData, setFormData] = React.useState({ title: '', date: '', type: 'recital' });
  
    React.useEffect(() => {
      localStorage.setItem('events', JSON.stringify(events));
    }, [events]);
  
    const handleAddEvent = (e) => {
      e.preventDefault();
      if (formData.title && formData.date) {
        setEvents([...events, { ...formData, id: Date.now() }]);
        setFormData({ title: '', date: '', type: 'recital' });
      }
    };
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const filteredEvents = filter === 'all' ? events : events.filter(event => event.type === filter);
  
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="hero-bg relative py-20 text-center">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-[#f5e6cc] font-['Playfair_Display'] animate-[fadeIn_1s_ease]">
              Café Aroma
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-[#d4a373] animate-[fadeIn_1.5s_ease]">
              Donde el café y la cultura se encuentran
            </p>
          </div>
        </header>
  
        {/* Event Management Section */}
        <section className="py-16 px-4 md:px-16">
          <h2 className="text-4xl font-['Playfair_Display'] text-[#f5e6cc] text-center mb-8 animate-[fadeIn_0.5s_ease]">
            Gestiona Nuestros Eventos
          </h2>
          <div className="max-w-2xl mx-auto bg-[#6f4e37] p-8 rounded-lg shadow-lg fade-in">
            <div className="mb-6">
              <label className="block text-[#f5e6cc] mb-2">Filtrar Eventos:</label>
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="form-input w-full p-2 rounded"
              >
                <option value="all">Todos</option>
                <option value="recital">Recitales</option>
                <option value="flea_market">Ferias Americanas</option>
              </select>
            </div>
            <div>
              <h3 className="text-2xl font-['Playfair_Display'] text-[#f5e6cc] mb-4">Agregar Evento</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Título del evento"
                  className="form-input w-full p-2 rounded"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input w-full p-2 rounded"
                />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-input w-full p-2 rounded"
                >
                  <option value="recital">Recital</option>
                  <option value="flea_market">Feria Americana</option>
                </select>
                <button
                  onClick={handleAddEvent}
                  className="w-full bg-[#d4a373] text-[#3c2f2f] py-2 rounded hover:bg-[#e6b800] transition-colors"
                >
                  Agregar Evento
                </button>
              </div>
            </div>
          </div>
        </section>
  
        {/* Event Listings */}
        <section className="py-16 px-4 md:px-16 bg-[#4a3728]">
          <h2 className="text-4xl font-['Playfair_Display'] text-[#f5e6cc] text-center mb-8 animate-[fadeIn_0.5s_ease]">
            Próximos Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredEvents.length === 0 ? (
              <p className="text-center text-[#f5e6cc] col-span-3">No hay eventos disponibles.</p>
            ) : (
              filteredEvents.map(event => (
                <div key={event.id} className="event-card p-6 rounded-lg fade-in">
                  <h3 className="text-2xl font-['Playfair_Display'] text-[#f5e6cc]">{event.title}</h3>
                  <p className="text-[#d4a373] mt-2">{new Date(event.date).toLocaleDateString('es-ES')}</p>
                  <p className="text-[#f5e6cc] mt-2">{event.type === 'recital' ? 'Recital' : 'Feria Americana'}</p>
                </div>
              ))
            )}
          </div>
        </section>
  
        {/* Footer */}
        <footer className="py-8 text-center bg-[#3c2f2f]">
          <p className="text-[#f5e6cc]">&copy; 2025 Café Aroma. Todos los derechos reservados.</p>
        </footer>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));