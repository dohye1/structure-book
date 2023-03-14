import {
  withAsyncPaginate,
  UseAsyncPaginateParams,
  ComponentProps,
} from "react-select-async-paginate";
import Creatable, { CreatableProps } from "react-select/creatable";
import { GroupBase, MultiValue, OptionsOrGroups } from "react-select";
import { ReactElement } from "react";
import { getStackList } from "@/pages/api/stack.api";

type SelectAdditional = {
  page: number;
};

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

type Props = {
  value: MultiValue<Stack>;
  onChange: (values: MultiValue<Stack>) => void;
};

const getOptionsAsync = (page: number): Promise<Stack[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 30 }).map((_, index) => ({
          label: `page${page}-${index}`,
          value: `page${page}-${index}`,
        }))
      );
    }, 500);
  });
};

const OPTION_COUNT = 10;
const getStackListWithCount = getStackList(OPTION_COUNT);

export default function StackSelect({ value, onChange }: Props) {
  const loadOptions = async (
    search: string,
    loadedOptions: OptionsOrGroups<Stack, GroupBase<Stack>>,
    additional: SelectAdditional = { page: 0 }
  ) => {
    const OPTION = (await getStackListWithCount(additional.page, search)) ?? [];

    return {
      options: OPTION,
      hasMore: OPTION_COUNT === OPTION.length,
      additional: {
        ...additional,
        page: (additional?.page ?? 0) + 1,
      },
    };
  };

  const CreatableAsyncPaginate = withAsyncPaginate(
    Creatable
  ) as AsyncPaginateCreatableType;

  return (
    <CreatableAsyncPaginate
      loadOptions={loadOptions}
      value={value}
      onCreateOption={(createdValue) =>
        onChange([...value, { label: createdValue, value: createdValue }])
      }
      onChange={onChange}
      id="select-project-stack"
      instanceId="select-project-stack"
      isMulti
    />
  );
}
