import React from 'react';

export default function MembersSection({ members }) {
  return (
    <section className="container" id="gallery">
      <h2 className="center">Учасники гурту</h2>
      <div className="members">
        {members.map((member) => (
          <article className="card" key={member.name}>
            <img src={member.image} alt={member.name} />
            <p>{member.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
