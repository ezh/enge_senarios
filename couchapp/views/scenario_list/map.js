function(doc) {
  if (doc.type == 'scenario') {
      emit([doc.createdAt, doc.author], {_id: doc._id, _rev: doc._rev, title: doc.title, author: doc.author});
  }
}