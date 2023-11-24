import React, { useState, useEffect } from "react";
import { getEntityDetails } from "../../api/Api";
import { useParams } from 'react-router-dom';
import { ICurrency } from "../../types/ApiTypes";

const EntityDetailsPage = () => {
    const { id } = useParams();
    const [entityDetails, setEntityDetails] = useState<ICurrency | undefined>();

    useEffect(() => {
        async function fetchData() {
            try {
                if (id) {
                    const data = await getEntityDetails(id);
                    setEntityDetails(data);
                }
            } catch (error) {
                console.error('Api getEntityDetails Error:', error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div>
            {entityDetails && (
                <div>
                    {JSON.stringify(entityDetails)}
                </div>
            )}
        </div>
    );
};

export default EntityDetailsPage;