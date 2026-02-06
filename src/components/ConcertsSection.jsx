import React from 'react';

export default function ConcertsSection({ concerts, onTicketOrder }) {
  return (
    <section className="container concerts" id="concerts">
      <h2>Найближчі концерти</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Місто / Заклад</th>
              <th>К-сть місць</th>
              <th>Дата і час</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert) => (
              <tr key={concert.city}>
                <td>
                  <strong>{concert.city}</strong> — {concert.place}
                </td>
                <td>{concert.seats}</td>
                <td>{concert.date}</td>
                <td>
                  <button className="btn btn-ticket" onClick={() => onTicketOrder(concert.city)}>
                    Замовити квиток
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
