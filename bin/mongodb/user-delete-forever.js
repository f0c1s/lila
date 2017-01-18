var username = 'robert';
var userId = username.toLowerCase();
var user = db.user4.findOne({
  _id: userId
});
if (!user) throw 'No such user';
var multi = {
  multi: true
};
print('\n\n Delete user ' + user.username + ' with ' + user.count.game + ' games!\n\n');
// sleep(5000);

print('Set black games as anon');
print(db.game5.update({
  us: userId,
  'us.1': userId
}, {
  $pull: {
    us: userId
  }
}, multi).nModified + ' done');

print('Set white games as anon');
print(db.game5.update({
  us: userId,
  'us.0': userId
}, {
  $set: {
    'us.$': ''
  }
}, multi).nModified + ' done');
print('done');

print('Delete PMs');
print(db.m_thread.remove({
  visibleByUserIds: userId
}).nRemoved + ' done');

print('Delete rating history');
print(db.history3.remove({
  _id: userId
}).nRemoved + ' done');

print('Delete bookmarks');
print(db.bookmark.remove({
  u: userId
}).nRemoved + ' done');

print('Delete learn progress');
print(db.learn_progress.remove({
  _id: userId
}).nRemoved + ' done');

print('Delete perf stats');
var nb = 0;
for (var i = 5; i <= 20; i++)
  nb += db.perf_stat.remove({
    _id: userId + '/' + i
  }).nRemoved
print(nb + ' done');

print('Delete prefs');
print(db.pref.remove({
  _id: userId
}).nRemoved + ' done');

print('Delete relations from');
print(db.relation.remove({
  u1: userId
}).nRemoved + ' done');

print('Delete relations to');
print(db.relation.remove({
  u2: userId
}).nRemoved + ' done');

print('Delete security data');
print(db.security.remove({
  user: userId
}).nRemoved + ' done');

print('Delete team membership');
print(db.team_member.remove({
  user: userId
}).nRemoved + ' done');

print('Delete user');
print(db.user4.remove({
  _id: userId
}).nRemoved + ' done');

print('\n complete.');
