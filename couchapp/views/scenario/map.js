function(doc) {
  if (doc.type == 'scenario') {
    emit([doc._id, 0], null)
  } else if (doc.type == 'comment') {
    emit(doc.ancestors.concat([1]), null)
  }
}