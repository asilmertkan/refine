import React from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";

import { MutationMode, ResourceRouterParams } from "../../../interfaces";
import { useResourceWithRoute, useMutationMode, useNavigation } from "@hooks";
import {
    DeleteButton,
    RefreshButton,
    ListButton,
    DeleteButtonProps,
    SaveButton,
} from "@components";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
    recordItemId?: string | number;
    deleteButtonProps?: DeleteButtonProps;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
}) => {
    const { push } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(routeResourceName);

    return (
        <Card
            title={title ?? `Edit ${pluralize.singular(resource.name)}`}
            extra={
                <Row>
                    <Space>
                        {!recordItemId && <ListButton />}
                        <RefreshButton recordItemId={recordItemId} />
                    </Space>
                </Row>
            }
            actions={[
                <Space
                    key="action-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    {actionButtons ?? (
                        <>
                            <DeleteButton
                                mutationMode={mutationMode}
                                onSuccess={() => {
                                    return push(`/resources/${resource.route}`);
                                }}
                                {...deleteButtonProps}
                            />
                            <SaveButton {...saveButtonProps} />
                        </>
                    )}
                </Space>,
            ]}
        >
            {children}
        </Card>
    );
};