import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Буйуртмалар',
    path: '/order',
    icon: icon('ic_order'),
  },
  {
    title: 'Фойдаланувчилар',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Махсулотлар',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Вакансия',
    path: '/vacancy',
    icon: icon('ic_work'),
  },
];

export default navConfig;
