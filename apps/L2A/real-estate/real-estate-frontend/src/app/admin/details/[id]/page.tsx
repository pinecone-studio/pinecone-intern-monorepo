import ListingDetailAdminView from '../../_components/ListingDetailAdminView';

interface PageProps {
  params: { id: string };
}
const DetailsPage = ({ params }: PageProps) => {
  return (
    <ListingDetailAdminView
      listing={{
        image: '/listingcard.png',
        name: params.id,
      }}
    />
  );
};

export default DetailsPage;
