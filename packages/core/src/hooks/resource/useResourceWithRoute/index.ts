import { useContext, useCallback } from "react";
import { ResourceContext } from "@contexts/resource";

export const useResourceWithRoute = () => {
    const { resources } = useContext(ResourceContext);

    const resourceWithRoute = useCallback(
        (route: string) => {
            const resource = resources.find((p) => p.route === route);

            if (!resource) {
                throw new Error(`'${route}' not found on resources."`);
            }
            return resource;
        },
        [resources],
    );

    return resourceWithRoute;
};