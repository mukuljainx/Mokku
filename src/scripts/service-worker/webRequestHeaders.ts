import { headersDb } from "@/services/db";
import { getResourceTypeValues } from "../utils/get-resource-type";

export const modifyHeaderRulesOnWebRequest = async (): Promise<void> => {
    try {
        const activeHeaders = await headersDb.getAllActiveHeaders();

        // get previous ruleIDS from declarativeNetRequest
        const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
        const oldRuleIds = oldRules.map((rule) => rule.id);

        const newRules = activeHeaders.map((header) => {
            if (!header.condition.resourceTypes?.length) {
                header.condition.resourceTypes = getResourceTypeValues();
            }

            return {
                id: header.localId,
                priority: 99,
                action: header.action,
                condition: header.condition,
            };
        });

        // Use the arrays to update the dynamic rules
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: oldRuleIds,
            addRules: newRules,
        });
    } catch (error) {
        console.error("Error modifying header rules:", error);
    }
};
