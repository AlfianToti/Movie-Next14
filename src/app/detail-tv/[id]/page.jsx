"use server";

import DetailTv from "@/components/DetailTv";
import Header from "@/components/Header";
import { FetchData } from "@/libs/fetchData";

export default async function TvDetailsPage({ params }) {
  const tvId = params.id;
  const tvDetail = await FetchData({ uri: `tv/${tvId}` });
  const productionCompanies = tvDetail?.production_companies;

  return (
    <div className="h-fit flex flex-col items-center space-y-6 text-white">
      <Header />
      <DetailTv prodCom={productionCompanies} detailTv={tvDetail} />
    </div>
  );
}
