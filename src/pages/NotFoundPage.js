import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router';

export default function NotFoundPage() {
  const [redirecToFoodsPage, setredirecToFoodsPage] = useState(2);

  if(redirecToFoodsPage===0) return (<Redirect to='/comidas' />);

  new Promise(() => {
    setTimeout(() => {
      setredirecToFoodsPage(0);
    }, 5000);
  })

  return (
    <div data-testid="not-found-text">
      error pagina não existe redirecionando para pagina de comidas
    </div>
  );
}
