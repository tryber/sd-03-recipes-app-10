import { getFoodByID, getDrinkByID } from '../../services/api';

const functionToMakeRequisition = async (tipeRequsition, itemId, setObjectReturnedAfterReq) => {
  if (tipeRequsition === 'comidas') setObjectReturnedAfterReq(await getFoodByID(itemId));
  if (tipeRequsition === 'bebidas') setObjectReturnedAfterReq(await getDrinkByID(itemId));
};

export default functionToMakeRequisition;
