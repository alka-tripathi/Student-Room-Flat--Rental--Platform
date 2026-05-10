// res.cookie('token', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
//   maxAge: 24 * 60 * 60 * 1000,
// });

// res.cookie('token', token, {
//   httpOnly: true,
// production
// secure: true,
// sameSite: 'None',
//   secure: false,
//   sameSite: 'Lax',
// });

res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
});

return res.json({
  success: true,
  message: 'Login successful',
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
