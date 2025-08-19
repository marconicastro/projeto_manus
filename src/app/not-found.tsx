
'use client';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      color: '#333'
    }}>
      <h1 style={{
        fontSize: '4em',
        margin: '0',
        color: '#ff9500'
      }}>404</h1>
      <h2 style={{
        fontSize: '1.5em',
        margin: '10px 0',
        color: '#30d158'
      }}>Página Não Encontrada</h2>
      <p style={{
        fontSize: '1em',
        maxWidth: '600px'
      }}>A página que você está procurando não existe ou foi movida. Por favor, verifique o endereço e tente novamente.</p>
      <a href="/" style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#30d158',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
      }}>Voltar para a Página Inicial</a>
    </div>
  );
}


